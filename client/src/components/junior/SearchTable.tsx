import { Country } from "@/app/constants/countryType";
import { splitCurrency } from "@/app/utils/junior/splitCurrency";

interface Props {
  filteredData: FilteredData;
  selectedItem: Country | null;
  selectedItemBgClass: string;
  handleSelection: (country: Country) => void;
  handleDeselection: (country: Country) => void;
}

interface FilteredData {
  countries: Country[];
  [key: string]: any;
}

const SearchTable: React.FC<Props> = ({
  filteredData,
  selectedItem,
  selectedItemBgClass,
  handleSelection,
  handleDeselection,
}) => {
  return (
    <>
      {filteredData.countries.map((country, index) => (
        <tr
          key={index}
          className={`${
            selectedItem === country
              ? selectedItemBgClass
              : "hover:bg-slate-100"
          } hover:cursor-pointer`}
          onClick={() => {
            handleSelection(country);
            handleDeselection(country);
          }}
        >
          <td className="border p-2">{country.name}</td>
          <td className="border p-2">{country.native}</td>
          <td className="border p-2">{country.capital}</td>
          <td className="border p-2">{country.emoji}</td>
          <td className="border p-2">{splitCurrency(country.currency)}</td>
          <td className="border p-2">{country.continent.name}</td>
          <td className="border p-2">
            <ul>
              {country.languages.map((language, langIndex) => (
                <li key={langIndex}>
                  {language.name} ({language.code})
                </li>
              ))}
            </ul>
          </td>
        </tr>
      ))}
    </>
  );
};

export default SearchTable;
