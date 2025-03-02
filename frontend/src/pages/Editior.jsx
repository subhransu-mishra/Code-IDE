import React, { useEffect, useState } from 'react';
import EditiorNavbar from '../components/EditiorNavbar';
import Editor from '@monaco-editor/react';
import { MdLightMode } from 'react-icons/md';
import { AiOutlineExpandAlt } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api_base_url } from '../helper';
import { useParams } from 'react-router-dom';

const Editior = () => {
  const [tab, setTab] = useState("html");
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [htmlCode, setHtmlCode] = useState("<h1>Hello world</h1>");
  const [cssCode, setCssCode] = useState("body { background-color: #f4f4f4; }");
  const [jsCode, setJsCode] = useState("// some comment");
  
  const { projectID } = useParams();

  const changeTheme = () => {
    const editorNavbar = document.querySelector(".EditiorNavbar");
    if (isLightMode) {
      editorNavbar.style.background = "#141414";
      document.body.classList.remove("lightMode");
      setIsLightMode(false);
    } else {
      editorNavbar.style.background = "#f4f4f4";
      document.body.classList.add("lightMode");
      setIsLightMode(true);
    }
  };

  const run = () => {
    const iframe = document.getElementById("iframe");
    if (iframe) {
      iframe.srcdoc = `<style>${cssCode}</style>${htmlCode}<script>${jsCode}</script>`;
    }
  };

  useEffect(() => {
    setTimeout(run, 200);
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    fetch(api_base_url + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectID
      })
    })
      .then(res => res.json())
      .then(data => {
        setHtmlCode(data.project.htmlCode);
        setCssCode(data.project.cssCode);
        setJsCode(data.project.jsCode);
      });
  }, [projectID]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        fetch(api_base_url + "/updateProject", {
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projId: projectID,
            htmlCode,
            cssCode,
            jsCode
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            toast.success("Project saved successfully");
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((err) => {
          console.error("Error saving project:", err);
          toast.error("Failed to save project. Please try again.");
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projectID, htmlCode, cssCode, jsCode]);

  return (
    <>
      <EditiorNavbar />
      <ToastContainer />
      <div className="flex">
        <div className={`left w-[${isExpanded ? "100%" : "50%"}]`}>
          <div className="tabs flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[50px] px-[40px]">
            <div className="tabs flex items-center gap-2">
              {['html', 'css', 'js'].map(lang => (
                <div key={lang} onClick={() => setTab(lang)} className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">{lang.toUpperCase()}</div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <MdLightMode className="text-[20px] cursor-pointer" onClick={changeTheme} />
              <AiOutlineExpandAlt className="text-[20px] cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} />
            </div>
          </div>
          <Editor
            onChange={(value) => {
              if (tab === "html") setHtmlCode(value || "");
              if (tab === "css") setCssCode(value || "");
              if (tab === "js") setJsCode(value || "");
              run();
            }}
            height="82vh"
            theme={isLightMode ? "vs-light" : "vs-dark"}
            language={tab}
            value={tab === "html" ? htmlCode : tab === "css" ? cssCode : jsCode}
          />
        </div>
        {!isExpanded && (
          <iframe id="iframe" className="w-[50%] min-h-[82vh] bg-[#fff] text-black" title="output" />
        )}
      </div>
    </>
  );
};

export default Editior;
