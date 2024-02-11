"use client";
import { useState, useEffect, useRef } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Search from "@/components/icons/Search";
import { splitCurrency } from "./utils/junior/splitCurrency";
import { Colors } from "./constants/themeColors";
import Spinner from "@/components/junior/Spinner";

interface Country {
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  continent: { name: string };
  languages: { code: string; name: string }[];
}

export default function Page() {
  const client = new ApolloClient({
    uri: "https://countries.trevorblades.com/graphql",
    cache: new InMemoryCache(),
  });

  const [selectedItem, setSelectedItem] = useState<Country | null>(null);
  const [colorIndex, setColorIndex] = useState(0);
  const [selectedItemBgClass, setSelectedItemBgClass] = useState("");

  const [data, setData] = useState<{ countries: Country[] }>({ countries: [] });
  const [filterAndGroup, setFilteredAndGroup] = useState<{
    countries: Country[];
  }>({
    countries: [],
  });

  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");

  // const filteredData = data.countries.filter((c) =>
  //   Object.values(c).some(
  //     (val) =>
  //       typeof val === "string" && val.includes(searchRef.current?.value || "")
  //   )
  // );

  const getData = async () => {
    const result = await client.query({
      query: gql`
        query GetCountryList {
          countries {
            name
            native
            capital
            emoji
            currency
            continent {
              name
            }
            languages {
              code
              name
            }
          }
        }
      `,
    });
    setData(result.data);
    setFilteredAndGroup(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (str: string) => {
    setSearchValue(str);

    const searchParams = str.split(" ");
    let filterData = [...data.countries];

    searchParams.forEach((param) => {
      const [key, value] = param.split(":");

      if (key === "search") {
        filterData = filterData.filter((c) =>
          Object.values(c).some(
            (val) =>
              typeof val === "string" &&
              typeof value === "string" &&
              val.toLowerCase().includes(value.toLowerCase())
          )
        );
      }
      console.log(value);

      if (value === "" || value === null || value === undefined)
        setFilteredAndGroup({ countries: [...data.countries] });
      else setFilteredAndGroup({ countries: filterData });
    });
  };

  const handleSelection = (country: Country) => {
    if (country === selectedItem) setSelectedItem(null);
    else {
      setSelectedItem(country);
      setColorIndex((prev) => (prev + 1) % Object.keys(Colors.primary).length);
      const colorKeys = Object.keys(Colors.primary) as Array<
        keyof typeof Colors.primary
      >;
      const colorKey = colorKeys[colorIndex];
      setSelectedItemBgClass(Colors.primary[colorKey].background);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-12 pt-6 h-full">
      <div className="w-96 relative">
        <input
          type="text"
          placeholder="search:tt group:continent"
          className="py-2.5 pr-2.5 pl-10 text-sm rounded-full w-full shadow-sm placeholder:text-stone-400 focus:outline-none"
          ref={searchRef}
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="absolute w-6 h-6 fill-slate-300 top-2 left-2">
          <Search />
        </div>
      </div>
      <div
        className={`${
          data.countries.length > 0
            ? "w-full h-full"
            : "w-1/3 h-28 flex items-center justify-center"
        } rounded-lg bg-white shadow-sm p-2 overflow-auto scrollbar`}
      >
        {data.countries.length > 0 ? (
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Native</th>
                <th className="border p-2">Capital</th>
                <th className="border p-2">Emoji</th>
                <th className="border p-2">Currency</th>
                <th className="border p-2">Continent</th>
                <th className="border p-2">Languages</th>
              </tr>
            </thead>
            <tbody>
              {filterAndGroup.countries.map((country, index) => (
                <tr
                  key={index}
                  className={`${
                    selectedItem === country
                      ? selectedItemBgClass
                      : "hover:bg-slate-100"
                  } hover:cursor-pointer`}
                  onClick={() => handleSelection(country)}
                >
                  <td className="border p-2">{country.name}</td>
                  <td className="border p-2">{country.native}</td>
                  <td className="border p-2">{country.capital}</td>
                  <td className="border p-2">{country.emoji}</td>
                  <td className="border p-2">
                    {splitCurrency(country.currency)}
                  </td>
                  <td className="border p-2">{country.continent.name}</td>
                  <td className="border p-2">
                    <ul>
                      {country.languages.map((language, langIndex) => (
                        <li key={langIndex}>
                          {language.name} {language.code}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center space-x-4 text-2xl font-thin">
            <Spinner />
            <div>Processing...</div>
          </div>
        )}
      </div>
    </div>
  );
}
