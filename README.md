<div align="center">

# AI Customer Support

### A real-time, voice-first support agent that listens, speaks, and routes common retail questions.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-Live_API-8E75B2?logo=googlegemini&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)

</div>

## Why this exists

Support teams repeatedly answer the same questions about orders, availability, sizing, returns, and refunds. This prototype explores how a conversational voice agent can resolve those routine requests immediately while recognizing when a customer needs specialist help.

The included retail persona, **Rajesh**, follows a defined service playbook: greet warmly, collect the information needed for common cases, give concise answers, and route unfamiliar or sensitive requests to a human team.

## What the prototype demonstrates

- Low-latency, two-way voice conversations through the Gemini Live API
- A configurable agent name, personality, voice, and visual identity
- Intent-specific guidance for order tracking, returns, stock, and sizing
- Human-support escalation language for requests outside the agent's scope
- Optional customer context for more personal conversations
- Audio capture, streaming playback, volume monitoring, and an animated canvas face
- Connection and quota-error states for a clearer demo experience

## Experience flow

```text
Customer speaks
      ↓
Browser captures and streams audio
      ↓
Gemini Live session applies the support playbook
      ↓
Spoken response + animated visual feedback
      ↓
Resolution or recommendation to contact a specialist
```

## Tech stack

| Layer | Technology |
| --- | --- |
| UI | React 19, TypeScript, CSS |
| Build tooling | Vite |
| Conversational AI | Google Gemini Live API via `@google/genai` |
| Client state | Zustand |
| Real-time events | EventEmitter3 |
| Audio | Web Audio API and AudioWorklets |
| Visual feedback | HTML Canvas |

## Run locally

**Requirements:** Node.js, npm, a modern browser with microphone access, and a Gemini API key.

```bash
git clone https://github.com/nikhilkoyyada7868/AI_Customer_Support.git
cd AI_Customer_Support
npm install
```

Create `.env.local`:

```env
GEMINI_API_KEY=your_api_key_here
```

Then start the app:

```bash
npm run dev
```

Open `http://localhost:3000`, allow microphone access, and start a conversation.

## Prototype boundaries

This is a front-end product prototype, not a production support platform. The order, inventory, refund, and escalation responses are prompt-driven examples; they are not connected to an order-management system, ticketing tool, CRM, or human-agent queue. The API key is injected into the browser build, so a production version should proxy Live API access through an authenticated backend and add authorization, observability, consent, and data-retention controls.

## Product opportunities

- Connect real order and inventory APIs
- Create tickets and route them by department and urgency
- Add transcript review, quality scoring, and containment analytics
- Support multilingual conversations and channel handoff
- Introduce guardrails, redaction, and human approval for consequential actions

## License

Licensed under the terms in [LICENSE](LICENSE).
