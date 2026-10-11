<script setup lang="ts">
    import SectionModel from '@/components/SectionModel.vue'
    import { ref } from 'vue'
    import Button from '@/components/Button.vue'

    const form = ref({ name: '', email: '', message: '', botField: '' })
    const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
    const errorCode = ref('')
    const fieldErrors = ref<Record<string, string>>({})

    const errorMessages: Record<string, string> = {
        invalid_input: 'Please check the highlighted fields.',
        rate_limited: 'Too many messages in a short time. Please try again in a minute.',
        send_failed: "Your message couldn't be delivered. Please try again later.",
        network: "Can't reach the server. Check your connection and try again.",
        unknown: 'Something unexpected happened. Please try again.'
    }

    const fieldMessages: Record<string, Record<string, string>> = {
        name: { required: 'Please enter your name.' },
        email: { required: 'Please enter your email.', invalid: 'This email address looks invalid.' },
        message: { required: 'Please write a message.', too_long: 'Your message is too long (5000 characters max).' }
    }

    async function submit() {
        status.value = 'sending'
        errorCode.value = ''
        fieldErrors.value = {}

        let res: Response
        try {
            res = await fetch(`/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form.value)
            })
        } catch {
            status.value = 'error'
            errorCode.value = 'network'
            return
        }

        let data: { ok?: boolean; code?: string; fields?: Record<string, string> } = {}
        try {
            data = await res.json()
        } catch {
            // response wasn't JSON (wrong port, gateway error page)
        }

        if (res.ok && data.ok) {
            status.value = 'sent'
            return
        }

        status.value = 'error'
        errorCode.value = data.code && data.code in errorMessages ? data.code : 'unknown'
        fieldErrors.value = data.fields ?? {}
    }

    const fieldError = (field: string) => fieldMessages[field]?.[fieldErrors.value[field]] ?? ''
</script>

<style scoped>
    @reference '@/style.css';

    .alert {
        @apply px-6 py-4 rounded-xl border-none flex justify-center items-center mt-10;
    }

    .alert-success {
        @apply bg-emerald-800/30 text-emerald-900;
    }

    .alert-error {
        @apply bg-red-800/30 text-red-900;
    }

    html.dark .alert-success {
        @apply text-emerald-400;
    }

    html.dark .alert-error {
        @apply text-red-400;
    }

    .input {
        @apply w-full border border-primary mt-6 rounded-md p-4 min-h-12;
    }

    .input.invalid {
        @apply border-red-900;
    }

    .error {
        @apply text-sm text-red-500 text-left pl-4 mt-1.5;
    }
</style>

<template>
    <SectionModel id="contact" title="Contact me">
        <div v-if="status === 'sent'" role="alert" class="alert alert-success alert-soft">
            <span>Thanks! Your message has been sent. I’ll be back to you ASAP!</span>
        </div>

        <form v-else @submit.prevent="submit" class="max-w-lg mx-auto py-4" novalidate>
            <input
                v-model="form.name"
                name="name"
                placeholder="Name"
                type="text"
                class="input"
                :class="fieldError('name') && 'invalid'"
                required
            />
            <h6 class="error" v-if="fieldError('name')">{{ fieldError('name') }}</h6>

            <input
                v-model="form.email"
                name="email"
                type="email"
                placeholder="Email"
                class="input"
                :class="fieldError('email') && 'invalid'"
                required
            />
            <h6 class="error" v-if="fieldError('email')">{{ fieldError('email') }}</h6>

            <textarea
                v-model="form.message"
                name="message"
                placeholder="Message"
                class="input h-32"
                :class="fieldError('message') && 'invalid'"
                required
            />
            <h6 class="error" v-if="fieldError('message')">{{ fieldError('message') }}</h6>

            <!-- honeypot: hidden from humans, bots fill it in -->
            <input
                v-model="form.botField"
                tabindex="-1"
                autocomplete="off"
                aria-hidden="true"
                class="absolute left-[9999px]"
            />

            <Button
                type="submit"
                :disabled="status === 'sending'"
                :text="status === 'sending' ? 'Sending...' : 'Send your message'"
            />
        </form>
    </SectionModel>
</template>
