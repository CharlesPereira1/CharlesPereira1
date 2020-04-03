/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { FaGithubAlt, FaSearch } from 'react-icons/fa';
import { FiGitPullRequest } from 'react-icons/fi';
import { GoRepoForked, GoStar } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from '~/components/Container';
import InputSearch from '~/components/InputSearch';
import Loading from '~/components/Loading';
import ScrollLoading from '~/components/ScrollLoading';
import {
  repoRequestSearch,
  repoRequestNextPage,
} from '~/store/modules/repository/actions';
import { colors } from '~/styles/colors';

import { Form, List } from './styles';

export default function Repository() {
  const scrollObserver = useRef();
  const dispatch = useDispatch();
  const repositories = useSelector(state => state.repository.repos);
  const loading = useSelector(state => state.repository.loading);
  const filters = useSelector(state => state.repository.search);
  const scrollLoading = useSelector(state => state.repository.plusPage);

  const [search, setSearch] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [scrollRadio, setScrollRadio] = useState(null);

  // recupera dados do input
  const handleSearchMain = value => {
    setSearch(value);
  }

  // quando o nome do input mudar dispara a ação dos parametros
  useEffect(() => {
    dispatch(
      repoRequestSearch({
        search: search || 'javascript',
        page: 1,
        filter: newFilter || 'forks',
        perPage,
      })
    );
  }, [search]); // eslint-disable-line

  /**
   * Scroll infinito
   */
  const intersectionObserver = new IntersectionObserver(entries => {
    const radio = entries[0].intersectionRatio;
    setScrollRadio(radio);
  });

  useEffect(() => {
    intersectionObserver.observe(scrollObserver.current);
    return () => {
      intersectionObserver.disconnect();
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    if (scrollRadio > 0) {
      const newPage = page + 1;
      setPage(newPage);
      dispatch(
        repoRequestNextPage({
          search: search || 'javascript',
          page,
          filter: newFilter || 'forks',
          perPage,
        })
      );
    }
  }, [scrollRadio]); // eslint-disable-line

  const handleFilter = f => {
    setNewFilter(f.target.value);
  }

  useEffect(() => {
    dispatch(
      repoRequestSearch({
        search: search || 'javascript',
        page,
        filter: newFilter || 'forks',
        perPage,
      })
    );
  }, [newFilter]); // eslint-disable-line

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Buscar Repositório
      </h1>

      <Form>
        <div>
          <InputSearch handleSearch={handleSearchMain} />
          <FaSearch size={15} color={colors.primary} />
        </div>

        <select value={newFilter} onChange={handleFilter}>
          <option selected value="stars">stars</option>
          <option value="forks">forks</option>
          <option value="issues">issues</option>
          <option value="updates">updates</option>
        </select>
      </Form>

      <h2>{filters || 'JavaScript'}</h2>
      {loading ? (
        <Loading />
      ) : (
          <List>
            {repositories &&
              repositories.map(repo => (
                <li key={repo.id}>
                  <img src={repo.owner.avatar_url} alt={repo.owner.login} />
                  <strong>{repo.name}</strong>
                  <span maxLength="10">{repo.description}</span>
                  <div>
                    <p>
                      <GoStar size={14} color={colors.primary} />
                      {repo.stargazers_count}
                    </p>
                    <p>
                      <GoRepoForked size={14} color={colors.primary} />
                      {repo.forks_count}
                    </p>
                    <Link
                      to={`/pullrequests/${encodeURIComponent(
                        repo.full_name
                      )}/pulls`}
                    >
                      <FiGitPullRequest size={14} color={colors.primary} />
                    Pull Request
                  </Link>
                  </div>
                </li>
              ))}
          </List>
        )}
      {scrollLoading && !loading && <ScrollLoading />}
      <div ref={scrollObserver} />
    </Container>
  );
}
