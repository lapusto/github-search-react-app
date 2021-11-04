import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Repos } from "../components/Repos";
import { GithubContext } from "../context/github/githubContext";

export const Profile = ({ match }) => {
  const { getUser, getRepos, loading, user, repos } = useContext(GithubContext);
  const urlName = match.params.name;

  useEffect(() => {
    getUser(urlName);
    getRepos(urlName);
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
  } = user;

  return (
    <Fragment>
      <Link to="/" className="btn btn-link">
        Home
      </Link>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3 text-center">
              <img src={avatar_url} alt={name}  style={{width: '150px'}}/>
              <h1>{name}</h1>
              {location && <p>{location}</p>}
            </div>
            <div className="col">
              {bio && (
                <Fragment>
                  <h3>BIO</h3>
                  <p>{bio}</p>
                </Fragment>
              )}
              <a href={html_url} 
              target="_blank" 
              rel='noreferrer'
              className="btn btn-dark mb-2">Open profile</a>
              <ul>
                {login && <li>
                  <strong>Username: </strong> {login}
                  </li>}
                  {company && <li>
                  <strong>Company: </strong> {company}
                  </li>}
                  {blog && <li>
                  <strong>Website: </strong> {blog}
                  </li>}
              </ul>
                    <span className='badge bg-primary m-1'>Followers: {followers}</span>
                    <span className='badge bg-warning text-dark m-1'>Following: {following}</span>
                    <span className='badge bg-info m-1'>Repositories: {public_repos}</span>
                    <span className='badge bg-success m-1'>Gists: {public_gists}</span>

            </div>
          </div>
        </div>
      </div>

      <Repos repos={repos}/>
    </Fragment>
  );
};
