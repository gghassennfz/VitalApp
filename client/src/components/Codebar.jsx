import axios from "axios";
import React, { useEffect, useState } from "react";
import EditVemballage from "./EditVEmballage";
import Fabrication from "./EditVfabrication";
import Nettoyage from "./EditVnettoyage";
import Pese from "./EditVerifpese";

function Codebar() {
  const [barcode, setBarcode] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const [isPasting, setIsPasting] = useState(false);

  const handleBarcodeChange = (event) => {
    setBarcode(event.target.value);
  };

  useEffect(() => {
    window.addEventListener("paste", (e) => {
      setBarcode(e.clipboardData.getData("text"));
      setIsPasting(true);
    });
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/search/${barcode}`
      );
      setSearchResult(response.data);
      setError(null);
    } catch (err) {
      setError("Error searching for barcode");
      setSearchResult(null);
    }
  };

  useEffect(() => {
    if (isPasting) {
      handleSearch();
      setIsPasting(false);
    }
  }, [isPasting]);

  const RenderComponent = () => {
    const documentName = searchResult ? Object.keys(searchResult)[0] : null;
    const document = searchResult ? Object.values(searchResult)[0] : null;

    console.log({ document });

    switch (documentName) {
      case "emb":
        return <EditVemballage selectedId={document._id} />;
      case "fab":
        return <Fabrication selectedId={document._id} />;
      case "nett":
        return <Nettoyage selectedId={document._id} />;
      case "pese":
        return <Pese selectedId={document._id} />;
      default:
        return <p>Document n'est pas trouvé !</p>;
    }
  };

  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <div className="header">
            <h1 className="titrebarcode">Recherche rapide (code a barre)</h1>
            <div className="inpoutbarcode">
              <input
                type="text"
                placeholder="Enter barcode"
                value={barcode}
                onChange={handleBarcodeChange}
              />
              <button onClick={handleSearch}>Chercher :</button>
            </div>
          </div>
          {error && <p>{error}</p>}
          {searchResult && (
            <div>
              <h2> Resultat :</h2>
              {/* Display search result data here */}
              <RenderComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Codebar;
