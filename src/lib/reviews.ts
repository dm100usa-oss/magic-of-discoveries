// Отзывы, перенесенные со старого сайта. Только реальные, ничего выдуманного.
export interface Review {
  text: string;
  who: string;
  stars: number;
}

export const reviews: Review[] = [
  {
    text: "Pretty awesome book, may be a bit too much for a 3-year-old, but we're fine with waiting a bit. Lots of detailed step-by-step traceable drawings of all kinds of things, from sea animals to food. Looks like lots of fun.",
    who: "Dmitriy Parmenov, June 19, 2024, US",
    stars: 5,
  },
  {
    text: "This is our second coloring book from these guys. Well loved by our kids, these are light enough to take with when leaving the house. We occasionally cut a page or two out when done, to date and save for future memorabilia.",
    who: "Valentina Sh, May 24, 2024, US",
    stars: 5,
  },
  {
    text: "Good quality, lots of different pictures. For that price you get a lot of pictures to practice drawing, the book is quite thick. Bought it as a gift for my friend's child, age 3, and she was very happy about it.",
    who: "Danil, June 8, 2024, UK",
    stars: 5,
  },
  {
    text: "Great for a 3-year-old, he likes the large shapes and friendly faces. They are easy to color, and there's a great range of things to color, from a mermaid to a submarine to a donut.",
    who: "Anna, June 11, 2024, US",
    stars: 5,
  },
];
