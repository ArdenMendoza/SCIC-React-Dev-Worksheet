import Image from "next/image";
import React from "react";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { useQuery } from "react-query";

class Pokemon {
  constructor(public name: string, public url: string) {}
}

class ApiResponse {
  constructor(
    public count: number,
    public next: string,
    public previous: string,
    public results: Pokemon[]
  ) {}
}

const PokeApi = () => {
  const { isError, isSuccess, isLoading, data, error } = useQuery(
    "pokemons",
    async () => {
      return await fetch("https://pokeapi.co/api/v2/pokemon").then((res) =>
        res.json()
      );
    },
    { staleTime: 60000 }
  );

  const [apiResponse, setApiResponse] = React.useState<
    ApiResponse | undefined
  >();

  React.useEffect(
    () =>
      data &&
      setApiResponse(
        new ApiResponse(data.count, data.next, data.previous, data.results)
      ),
    [data]
  );

  const styles = {
    mainContainer: {
      display: "flex",
      width: "100%",
      flexWrap: "wrap",
      rowGap: 10,
      columnGap: 10,
      justifyContent: "center",
    } as React.CSSProperties,
  };

  return (
    <div style={styles.mainContainer}>
      {apiResponse?.results
        .map((pokemon) => {
          const pokemonId = pokemon.url.slice(
            pokemon.url.indexOf("pokemon/") + 8,
            -1
          );
          return {
            pokemonId,
            name: pokemon.name,
            imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
            url: pokemon.url,
          };
        })
        .map((m) => (
          <Card
            hoverable
            cover={<Image src={m.imgUrl} height={150} width={150} />}
          >
            <Meta title={m.name} description={`#${m.pokemonId}`} />
          </Card>
        ))}
    </div>
  );
};

export default PokeApi;
