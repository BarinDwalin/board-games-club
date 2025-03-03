interface GameImageProps {
  title: string;
  src?: string;
}

export function GameImage({ title, src }: GameImageProps) {
  return (
    <picture
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: "#f2f2f2",
      }}
    >
      <img
        alt={title}
        title={title}
        src={src}
        loading="lazy"
        style={{
          display: "block",
          height: "100%",
          maxHeight: "none",
          maxWidth: "none",
          objectFit: "contain",
          objectPosition: "center",
          width: "100%",
        }}
      />
    </picture>
  );
}
