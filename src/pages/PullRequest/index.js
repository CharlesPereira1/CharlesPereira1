import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaRegCalendarTimes, FaUser } from 'react-icons/fa';
import { FiGitPullRequest } from 'react-icons/fi';
import { useRouteMatch, Link } from 'react-router-dom';

import { format, parseISO } from 'date-fns';

import Container from '~/components/Container';
import api from '~/services/api';
import { colors } from '~/styles/colors';

import { List } from './styles';

export default function PullRequest() {
  const [request, setRequest] = useState([]);

  const match = useRouteMatch('/pullrequests/:request/pulls');

  useEffect(() => {
    async function loadRequest() {
      const repoName = decodeURIComponent(match.params.request);

      const res = await api.get(`/repos/${repoName}/pulls`);

      setRequest(res.data);
    }

    loadRequest();
  }, []); // eslint-disable-line

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        PULL REQUEST
      </h1>
      <Link to="/">Voltar</Link>
      <List>
        {request.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" >
              <img src={repo.user.avatar_url} alt={repo.user.login} />
            </a>

            <div>
              <span>
                <FaUser size={14} color={colors.primary} />
                {repo.user.login}
              </span>
              <span>
                <FaRegCalendarTimes size={15} color={colors.primary} />
                {format(parseISO(repo.created_at), 'MM/dd/yyyy')}
              </span>
              <span>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  <FiGitPullRequest size={14} color={colors.primary} />
                  Pull Request
                </a>
              </span>
            </div>
            <strong maxRows={3}> </strong>
            <textarea ols="1" rows="12" >
              {repo.body}
            </textarea>
          </li>
        ))}
      </List>
    </Container>
  );
}
