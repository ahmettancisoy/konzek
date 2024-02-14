"use client";
import { useState, useEffect, useRef } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Search from "@/components/icons/Search";
import { Colors } from "./constants/themeColors";
import Spinner from "@/components/junior/Spinner";
import { getLastNestedValue } from "./features/junior/group";
import { Country } from "./constants/countryType";
import SearchTable from "@/components/junior/SearchTable";
import GroupTable from "@/components/junior/GroupTable";

interface FilteredData {
  countries: Country[];
  [key: string]: any;
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
  const [filteredData, setFilteredData] = useState<FilteredData>({
    countries: [],
  });
  const [groupFilteredData, setGroupFilteredData] = useState<{
    [key: string]: Country[];
  }>({});
  const [isGrouped, setIsGrouped] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");

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
    setFilteredData(result.data);
  };

  const selectOnLoadAndAfterFilter = () => {
    if (isGrouped) {
      if (Object.keys(groupFilteredData).length > 0) {
        const cts: Country[] = [];
        Object.entries(groupFilteredData).map(([groupKey, countries]) => {
          countries.forEach((country) => cts.push(country));
        });
        if (cts.length >= 10) handleSelection(cts[9]);
        else handleSelection(cts[cts.length - 1]);
      }
    } else {
      if (filteredData.countries.length >= 10)
        handleSelection(filteredData.countries[9]);
      else
        handleSelection(
          filteredData.countries[filteredData.countries.length - 1]
        );
    }
  };

  useEffect(() => {
    getData();
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    selectOnLoadAndAfterFilter();
  }, [filteredData, groupFilteredData]);

  const handleSearch = (str: string) => {
    setSearchValue(str);

    const searchParams = str.split(" ");
    let searchedData = [...data.countries];

    const containsGroup = searchParams.some((param) =>
      param.includes("group:")
    );
    if (containsGroup) setIsGrouped(true);
    else setIsGrouped(false);

    searchParams.forEach((param) => {
      let [key, value] = param.split(":");

      if (key === "search") {
        searchedData = searchedData.filter((c) =>
          Object.values(c).some(
            (val) =>
              typeof val === "string" &&
              typeof value === "string" &&
              val.toLowerCase().includes(value.trim().toLowerCase())
          )
        );
      } else if (key === "group" && value && value !== null) {
        setGroupFilteredData(() => {
          const groupedData = searchedData.reduce((acc, country) => {
            const validKeys = Object.keys(country);

            if (validKeys.includes(value.toLowerCase())) {
              const groupName = getLastNestedValue(
                country[value.toLowerCase() as keyof Country]
              );

              if (groupName !== null) {
                if (!acc[groupName.toString()]) {
                  acc[groupName.toString()] = [];
                }
                acc[groupName.toString()].push(country);
              } else {
                if (!acc["null"]) {
                  acc["null"] = [];
                }
                acc["null"].push(country);
              }
            }
            return acc;
          }, {} as { [key: string]: Country[] });

          return groupedData;
        });
      }

      if (value === null || value === undefined) value = "";
      if (key === "search" && value === "")
        setFilteredData({ countries: [...data.countries] });
      else setFilteredData({ countries: searchedData });
      if (key === "group" && value === "") setGroupFilteredData({});
    });
  };

  const handleDeselection = (country: Country) => {
    if (country === selectedItem) setSelectedItem(null);
  };

  const handleSelection = (country: Country) => {
    if (country !== selectedItem) {
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
    <div className="flex flex-col items-center space-y-12 py-6 h-full px-12">
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
              {!isGrouped ? (
                <SearchTable
                  filteredData={filteredData}
                  selectedItem={selectedItem}
                  selectedItemBgClass={selectedItemBgClass}
                  handleSelection={handleSelection}
                  handleDeselection={handleDeselection}
                />
              ) : (
                <GroupTable
                  groupFilteredData={groupFilteredData}
                  selectedItem={selectedItem}
                  selectedItemBgClass={selectedItemBgClass}
                  handleSelection={handleSelection}
                  handleDeselection={handleDeselection}
                />
              )}
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
