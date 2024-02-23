export const changelog = [
  {
    version: "0.2.1",
    releaseDate: "23.02.2024",
    type: [
      {
        name: "ui",
        changes: [
          { description: "Dodano kolory ról w panelu administracyjnym" },
        ],
      },
      {
        name: "feat",
        changes: [
          { description: "Dodano upvoting system" },
          {
            description:
              "Dodano ostrzeżenia przed usunięciem postów, przedmiotów oraz typów postów",
          },
        ],
      },
      {
        name: "fix",
        changes: [
          {
            description:
              "Naprawiono błędy przy dodawaniu i usuwaniu przedmiotów oraz typów postów",
          },
        ],
      },
    ],
  },
  {
    version: "0.2.0",
    releaseDate: "20.02.2024",
    type: [
      { name: "ui", changes: [{ description: "Wprowadzono nowe UI" }] },
      {
        name: "feat",
        changes: [
          { description: "Usprawniono nawigację" },
          { description: "Usprawniono formularze oraz ich walidację" },
          {
            description:
              "Wprowadzono filtrowanie i paginację na stronie głównej oraz w panelu administracyjnym",
          },
          { description: "Wprowadzono listę zmian" },
        ],
      },
      {
        name: "fix",
        changes: [
          { description: "Naprawiono wyświetlanie ikon" },
          { description: "Naprawiono pomniejsze błędy" },
        ],
      },
      {
        name: "perf",
        changes: [
          {
            description:
              "Poprawiono zabezpieczenia i zoptymalizowano część serwerową aplikacji",
          },
        ],
      },
    ],
  },
];
