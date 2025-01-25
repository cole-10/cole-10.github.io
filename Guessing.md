```mermaid
flowchart TD
    A[Start] --> B[Generate Random Number]
    B --> C[Prompt User for Guess]
    C --> D[Validate Input]
    D --> E{Is Input Valid?}
    E -- No --> C[Prompt User for Guess]
    E -- Yes --> F[Compare Guess to Random Number]
    F -- Yes --> H[Confirm Correct Guess]
    F -- No --> I{Is Guess Too High?}
    I -- Yes --> J[Feedback: Too High]
    I -- No --> K[Feedback: Too Low]
    J --> C
    K --> C
    H --> L[End]
```
Upon starting, the program will generate a random number. It will then prompt the user for their guess. After input is recieved it will undergo validation. If valid the input will be compared to the generated number. The user will recieve feedback depending on if their answer is too high, too low, or correct.