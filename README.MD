# Stubhub Clone

A microservice tickiting application

## Iteration 1 features

- User can list ticket for an event (concert, sports) for sale
- Other users can purchase this ticket
- Any user can list tickets for sale and purchase tickets
- When a user attempts to purchase a ticket, the ticket is 'Locked' for 15 minutes. The user have 15 minutes to enter thier payment information.
- While lock, no other user can purchase the ticket. After 15 min the ticket should unlock.
- Ticket prices can be edited if they are not locked.

## Tech Stack

- Next.js
- Nodejs
- TypeScript
- MongoDB
- Redis
- NATS Streaming Server
