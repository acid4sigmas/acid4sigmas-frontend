import { useEffect, useState } from "react";
import { CenteredContainer, Container } from "../components/Container";
import TopBar from "./Topbar";
import config from '../config.json';
import { RepoInfo } from "../types";

export default function About() {
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [repos, setRepos] = useState<RepoInfo[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const result = await fetch(config.api_url + "/pub_api/repo", {
          method: "GET"
        });
  
        if (!result.ok) {
          const response = await result.json();
          throw new Error(response);
        }
  
        const response: RepoInfo[] = await result.json();
        setRepos(response);

        console.log(response);


  
      } catch (e) {
        console.error(e);
      }
    }

    fetchRepos();
  },[]);

  const calculateLanguagePercentages = (languages: { [key: string]: number }) => {
    const total = Object.values(languages).reduce((sum, value) => sum + value, 0);
    return Object.entries(languages)
      .map(([language, value]) => ({
        language,
        percentage: Math.round(total > 0 ? (value / total) * 100 : 0),
      }))
      .sort((a, b) => b.percentage - a.percentage); 
  };
  return (
    <div>
      <TopBar />
        <Container>
          <CenteredContainer>
            <h1>Hello!</h1>
            <p>Welcome to my website</p>
            <br />
            <div className="flex justify-center flex-wrap">
              <div className="text-center justify-center mr-3 ">
              <div className="bg-background-tertiary w-fit p-4 rounded">
                <details>
                  <summary>who am i?</summary>
                  <h4>I am klover</h4>
                  <hr />
                  <ul>
                    <h4>basic informations about me</h4>
                    <li>18 years old male</li>
                    <li>I am a fullstack developer</li>
                  </ul>
                  <hr />
                  <ul>
                    <h4>Interests and hobbies</h4>
                    <li>Working out physically</li>
                    <li>playing video games (bf 2042, osu)</li>
                    <li>and of course coding</li>
                  </ul>
                  <hr />
                  <div className="bg-background-secondary mt-2 pb-2 pt-2 pr-4 pl-4 rounded-md">
                    <h3 className="text-red-600">Personal Contact</h3>
                    <p>please consider writing an email to</p>
                    <div
                      className="mt-2 mb-2 bg-secondary p-2 rounded-lg shadow-lg"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "klover@acid4sigmas.systems",
                        );
                        setCopiedText(true);
                        setTimeout(() => {
                          setCopiedText(false);
                        }, 2500);
                      }}
                    >
                      <p>klover@acid4sigmas.systems</p>
                      <p className="text-grey-100">
                        <small>click to copy</small>
                      </p>
                    </div>
                    {copiedText ? (
                      <span className="text-green-500">
                        <b>copied</b>
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </details>
              </div>
              </div>
              <div className="text-center justify-center ml-2">
                <div className="bg-background-tertiary w-fit p-4 rounded">
                <details>
                  <summary>About this Project</summary>
                  <h4>The Acid4Sigmas Project</h4>
                  <hr/>
                  <h4>What is this project about?</h4>
                  <ul>
                    <li>The direction of this project is not clear yet.</li>
                  </ul>
                  <hr/>
                  <h4>Open Source? to 100%.</h4>
                  <p>this project is to 100% open source.</p>
                  <p>because i know how annoying it can be,<br/> to not know what this website does behind closed doors.</p>
                  <p>you can find the repos on my GitHub</p>
                  <br/>
                  <p>feel free to contribute, fork, modify this project</p>
                  <p>Licensed under MIT</p>
                  <hr/>
                  <h4>GitHub Repos</h4>
                  <div className="flex">
                    <div className="justify-center flex gap-3 flex-wrap">
                      {repos.map((repo) => (
                        <div className="p-5 bg-secondary rounded-md">
                          <h3><u><a href={repo.repo.html_url} target="_blank">{repo.repo.name}</a></u></h3>
                          <div className="flex gap-4">
                            <div className="text-left">
                              <p>Owner: <u><a href={repo.repo.owner.html_url}>{repo.repo.owner.login}</a></u></p>
                              <p>Forks: {repo.repo.forks}</p>
                              <p>Language: {repo.repo.language}</p>
                            </div>
                            <div className="bg-background-secondary p-3 rounded-lg drop-shadow-lg">
                              {calculateLanguagePercentages(repo.languages).map(({ language, percentage }) => (
                                <p key={language}>
                                  {language}: {percentage}%
                                </p>
                              ))}
                            </div>
                          </div>
                        </div> 
                      ))}
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </CenteredContainer>
      </Container>
    </div>
  );
}



