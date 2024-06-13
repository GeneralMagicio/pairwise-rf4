import { PostHog } from 'posthog-node'

const client = new PostHog(
    process.env.NEXT_PUBLIC_POST_HOG_API!,
    { host: process.env.NEXT_PUBLIC_POST_HOG_HOST }
)

export const captureEvent = (distinctId: string, event: string, properties?: object) => {
    client.capture({
        distinctId,
        event,
        properties
    });
};

export default client;