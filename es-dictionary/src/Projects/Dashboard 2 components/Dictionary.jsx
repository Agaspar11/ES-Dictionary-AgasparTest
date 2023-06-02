import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";

export default function Dictionary({ showRecentSearch, searchclick, saveclick }) {
  const [TermSearch, setSearchTerm] = useState("");
  const [Speech, setPartOfSpeech] = useState("");
  const [phonetics, setPhonetics] = useState("");
  const [definition, setDefinition] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [recentSaveSearches, setRecentSaveSearches] = useState([]);

  const MAX_RECENT_SEARCHES = 21;

  const handleSearch = async (event) => {
    event.preventDefault();
    searchWord(TermSearch);
  };

  const searchWord = async (searchTerm) => {
    const MerriamWebKey = "98a198a3-a200-490a-ad48-98ac95b46d80";
    const MerriamWebUrl = `https://dictionaryapi.com/api/v3/references/collegiate/json/${searchTerm}?key=${MerriamWebKey}`;

    try {
      const response = await axios.get(MerriamWebUrl);
      const firstDefinition = response.data[0]?.shortdef;
      const PartOfSpeech = response.data[0]?.fl;
      const Phonetic = response.data[0]?.hwi.prs[0]?.mw;
      setPartOfSpeech(PartOfSpeech);
      setPhonetics(Phonetic);
      setDefinition(firstDefinition);

      if (!recentSearches.includes(searchTerm)) {
        const updatedSearches = [searchTerm, ...recentSearches];
        setRecentSearches(updatedSearches.slice(0, MAX_RECENT_SEARCHES));
      }
    } catch (error) {
      console.log(error);
      setDefinition("No definition found.");
    }

    const UnsplashKey = "gVfJPtlmzZ4XoaVB4p5SdGe0ILjssdLMcDqR3FH5gn0";
    const UnsplashUrl = `https://api.unsplash.com/photos/random?query=${searchTerm}&client_id=${UnsplashKey}`;

    try {
      const response = await axios.get(UnsplashUrl);
      const imageUrl = response.data.urls.regular;
      setImageUrl(imageUrl);
    } catch (error) {
      console.log(error);
      setImageUrl("");
    }
  };

  const handleRecentSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    searchWord(searchTerm);
  };

  const handleSaveSearch = () => {
    if (!recentSaveSearches.includes(TermSearch)) {
      const updatedSaveSearches = [TermSearch, ...recentSaveSearches];
      setRecentSaveSearches(updatedSaveSearches.slice(0, MAX_RECENT_SEARCHES));
    }
  };

  return (
    <div className="dictionary_container">
      <div className="dictionary_icons">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={TermSearch}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button className="search_btn" type="submit" onClick={searchclick}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <i className="fas fa-save" id="save" onClick={() => {
          saveclick();
          handleSaveSearch();
        }}></i>
      </div>
      <div className="dictionary_box">
        <div>
          <h1>{TermSearch}</h1>
          <p className="phonetics">{phonetics && `Phonetics: ${phonetics}`}</p>
          <h2>{definition && "Definition:"}</h2>
          <p className="definition">{definition}</p>
          <p>{Speech && `Parts of Speech: ${Speech}`}</p>
        </div>
        {imageUrl && (
          <div>
            <img className="image" src={imageUrl} alt={TermSearch} />
          </div>
        )}
      </div>

      <div className={showRecentSearch ? "recent_search2" : "recent_search"}>
        <h3 className="recent_title">Recent Search</h3>
        <ul className="recent_list">
          {recentSearches.map((search, index) => (
            <li
              key={index}
              className="recent_search_button"
              onClick={() => handleRecentSearch(search)}
            >
              {search}
            </li>
          ))}
        </ul>
      </div>

      <div className={showRecentSearch ? "recent_search2" : "recent_search"}>
        <h3 className="recent_title">Recent Save Search</h3>
        <ul className="recent_list">
          {recentSaveSearches.map((search, index) => (
            <li
              key={index}
              className="recent_search_button"
              onClick={() => handleRecentSearch(search)}
            >
              {search}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
