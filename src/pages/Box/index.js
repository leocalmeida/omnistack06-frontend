//5e90e4ee64a0ab00174445b8
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { formatDistanceToNow, parseISO } from "date-fns";
import pt from "date-fns/locale/pt-BR";
import DropZone from "react-dropzone";
import io from "socket.io-client";

import { MdInsertDriveFile } from "react-icons/md";
import logo from "../../assets/logo.svg";
import "./styles.css";

export default function Box(props) {
  const [box, setBox] = useState({});

  const localId = props.match.params.id;
  useEffect(() => {
    api.get(`boxes/${localId}`).then((response) => {
      setBox(response.data);
    });
  }, [localId]);

  function subscribeToNewFiles() {
    const socket = io("https://omnistack-06-backnd.herokuapp.com");
    // const socket = io("http://localhost:3333");

    socket.on("file", (file) => {
      box.files && setBox({ ...box, files: [file, ...box.files] });
    });
  }

  function handleUpload(files) {
    files.forEach((file) => {
      const data = new FormData();

      const boxId = props.match.params.id;

      data.append("file", file);

      api.post(`boxes/${boxId}/files`, data);
    });
  }

  subscribeToNewFiles();

  return (
    <div className="box-container">
      <header>
        <img src={logo} alt="rocketbox" />
        <h1>{box.title}</h1>
      </header>
      <DropZone onDropAccepted={handleUpload}>
        {({ getRootProps, getInputProps }) => (
          <div className="upload" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Arraste arquivos ou clique aqui!</p>
          </div>
        )}
      </DropZone>

      <ul>
        {box.files &&
          box.files.map((file) => (
            <li key={file._id}>
              <a className="fileInfo" href={file.url} target="blank">
                <MdInsertDriveFile size={24} color="#A5Cfff" />
                <strong> {file.title} </strong>
              </a>
              <span>
                há{" "}
                {formatDistanceToNow(parseISO(file.createdAt), {
                  locale: pt,
                })}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
