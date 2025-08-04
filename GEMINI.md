# Project Overview: RFGO Frontend React

This document outlines the core technical stack, architectural principles, and development conventions for the RFGO Frontend React project.

## Technical Stack

*   **Language:** TypeScript
*   **Frontend Framework:** React
*   **State Management:** Zustand
*   **API Client:** Apollo Client (for GraphQL interactions)
*   **UI Component Library (Layout):** Chakra UI (preferred for layout components like `Stack`, `HStack`, `VStack`, `Box` – **no direct `div` usage for layout**)
*   **UI Component Library (Functional):** DevExtreme (version 24.2.8) for rich, interactive components. If a specific functional component is not available or suitable in DevExtreme, Chakra UI should be used as the fallback.

## Architecture: Clean Architecture Principles

The project adheres to a Clean Architecture structure, promoting separation of concerns, testability, and maintainability. The primary layers are:

1.  **`infrastructure/`**: This layer contains external concerns and implementations that are subject to change. This includes API integrations (e.g., Apollo Client setup), utility functions that interact with external systems, and any third-party library configurations that are not directly UI components.

2.  **`domain/`**: This is the core of the application, containing enterprise-wide business rules and entities. It is independent of any external frameworks or databases. This layer defines interfaces (repositories) for data access that are implemented in the `infrastructure` layer.

3.  **`application/`**: This layer contains the application-specific business rules. It orchestrates the flow of data to and from the `domain` layer and interacts with the `infrastructure` layer through the interfaces defined in the `domain`. This includes services that encapsulate use cases and state management stores (Zustand).

4.  **`presentation/`**: This layer is responsible for the user interface. It contains React components (pages, layouts, and smaller UI components) that consume data from the `application` layer and dispatch user interactions back to it. This layer primarily uses Chakra UI for layout and DevExtreme for functional components.

## Development Conventions

*   **Layout:** All layout structures should be built using Chakra UI components (`Box`, `VStack`, `HStack`, `Stack`, etc.) to ensure consistency and leverage Chakra UI's styling system. Direct use of `div` for layout purposes is discouraged.
*   **Functional Components:** Prioritize DevExtreme components (version 24.2.8) for interactive UI elements (e.g., grids, forms, editors). If a required component is not available in DevExtreme or if Chakra UI offers a more suitable alternative for a simpler functional component, Chakra UI should be used.
*   **State Management:** All application-level state should be managed using Zustand stores, defined within the `application/store` directory.
*   **API Interactions:** All GraphQL API interactions should be handled through Apollo Client, configured within the `infrastructure` layer.
