export default function splitText(text: string, colorful = false) {
  const getRandomColor = () =>
    `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`;

  return text.split("").map((char, index) => (
    <span
      key={index}
      className="char"
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.transition = "none";
        (e.target as HTMLElement).style.color = getRandomColor();
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.transition = "color 1s";
        (e.target as HTMLElement).style.color = "#000000";
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}
