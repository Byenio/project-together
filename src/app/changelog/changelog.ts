type ChangelogEntry = {
  version: string;
  releaseDate: string;
  type: {
    name: "UI" | "Feat" | "Fix" | "Perf" | "Other";
    changes: {
      description: string;
    }[];
  }[];
};

const template = `
{
  version: "",
  releaseDate: "",
  type: [
    {
      name: "UI",
      changes: [
        { description: "" }
      ],
    },
    {
      name: "Feat",
      changes: [
        { description: "" }
      ],
    },
    {
      name: "Fix",
      changes: [
        {
          description: "",
        }
      ],
    },
    {
      name: "Perf",
      changes: [
        { description: "" }
      ],
    },
  ],
},
`;

export const changelog: ChangelogEntry[] = [
  {
    version: "0.3.1",
    releaseDate: "31.03.2024",
    type: [
      {
        name: "Other",
        changes: [
          { description: "Zmieniono bazę danych, przeniesiono wszystkie dane" },
        ],
      },
    ],
  },
  {
    version: "0.3.0",
    releaseDate: "03.03.2024",
    type: [
      {
        name: "UI",
        changes: [{ description: "Usprawniono niektóre elementy interfejsu" }],
      },
      {
        name: "Feat",
        changes: [
          { description: "Filtry są teraz zsynchronizowane z URL" },
          {
            description:
              "Dodano informację o ilości powiązanych postów do ostrzeżeń przed usunięciem ",
          },
          { description: "Zaktualizowano panel administracyjny" },
        ],
      },
      {
        name: "Fix",
        changes: [
          {
            description: "Usprawniono działanie systemu polubień",
          },
          { description: "Usprawniono działanie filtrów" },
        ],
      },
      {
        name: "Perf",
        changes: [{ description: "Optymalizacja części serwerowej aplikacji" }],
      },
    ],
  },
  {
    version: "0.2.1",
    releaseDate: "23.02.2024",
    type: [
      {
        name: "UI",
        changes: [
          { description: "Dodano kolory ról w panelu administracyjnym" },
        ],
      },
      {
        name: "Feat",
        changes: [
          {
            description:
              "Dodano ostrzeżenia przed usunięciem postów, przedmiotów oraz typów postów",
          },
        ],
      },
      {
        name: "Fix",
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
      { name: "UI", changes: [{ description: "Wprowadzono nowe UI" }] },
      {
        name: "Feat",
        changes: [
          { description: "Usprawniono nawigację" },
          { description: "Usprawniono formularze oraz ich walidację" },
          { description: "Wprowadzono system polubień" },
          {
            description:
              "Wprowadzono filtrowanie i paginację na stronie głównej oraz w panelu administracyjnym",
          },
          { description: "Wprowadzono listę zmian" },
        ],
      },
      {
        name: "Fix",
        changes: [
          { description: "Naprawiono wyświetlanie ikon" },
          { description: "Naprawiono pomniejsze błędy" },
        ],
      },
      {
        name: "Perf",
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
