import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";
import logo from "../../assets/logo.svg";
import api from "../../services/api";

export default function Main() {
  const [boxName, setBoxName] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("boxes", {
        title: boxName,
      });

      history.push(`/boxes/${response.data._id}`);
    } catch (error) {
      alert("Falha ao criar Box");
    }
  }

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="" />

        <input
          placeholder="Criar uma box"
          value={boxName}
          onChange={(box) => setBoxName(box.target.value)}
        />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}
