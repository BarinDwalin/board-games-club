import React from "react";
import { GameRecord } from "../../interfaces";
import './CollectionPage.css';

interface CollectionPageProps {
  collection: GameRecord[];
}

export function CollectionPage({ collection }: CollectionPageProps) {
  return (
    <>
      {/* <h1 className="page-header">Коллекция клуба</h1> */}
      {/* <img className="logo" width="204" height="144" src="img/logo.jpg" /> */}

      <div className="collection-list">
        {collection.map(({ game, owner }, i) => (
          <div key={game.id} className="game-card">
            <img className="image" src={game.photoUrl} />
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
    </>
  );
}
