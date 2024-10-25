import { Box } from "@mui/material";
import { GameRecord } from "../../../../interfaces";

interface MasonryCatalogProps {
  collection: GameRecord[];
}

export function MasonryCatalog({ collection }: MasonryCatalogProps) {
  return (
    <Box sx={{ position: "relative", paddingX: "24px", minHeight: "265px" }}>
      <div className="collection-list">
        {collection.map(({ game, owner }, i) => (
          <div key={game.id} className="game-card">
            <img
              className="image"
              src={game.photoUrl}
              alt="изображение коробки с игрой"
            />
            <div className="description">
              <div className="description__title">{game.title}</div>
              <div className="description__sub-title">
                <span className="description__sub-title_primary">
                  {game.year}
                </span>
                <span>{game.title2}</span>
              </div>
              <div className="description__sub-title">
                {game.bggRating ? (
                  <span>bggRating: {game.bggRating}</span>
                ) : (
                  <></>
                )}
                <span>{owner}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}
