import * as React from 'react';

import Avatar from '../../components/avatar';
import { Link } from 'react-router-dom';
import { POKEMON } from '../../../constants/appRoutes';

import { PokemonPagination as PokemonPaginationModel } from '../pokemon-list/pokemon-list.types';
import { getAvatarFromId } from '../../utils/pokemon';

interface OwnProps {
  currentPokemon: string;
  pagination: PokemonPaginationModel;
}

class PokemonPagination extends React.Component<OwnProps> {
  static displayName = 'PokemonPagination';

  render() {
    const {
      currentPokemon,
      pagination: { prev, next },
    } = this.props;

    if (currentPokemon === prev.id && currentPokemon === next.id) return null;

    return (
      <div className="PokemonPagination">
        {currentPokemon !== prev.id && (
          <Link
            className="PokemonPagination-link PokemonPagination--left"
            to={{ pathname: `${POKEMON.replace(':id', String(prev.id))}` }}
          >
            <span className="PokemonPagination-content">
              <span className="PokemonPagination-label">{prev.name}</span> <Avatar picture={getAvatarFromId(prev.id)} />
            </span>
          </Link>
        )}

        {currentPokemon !== next.id && (
          <Link
            className="PokemonPagination-link PokemonPagination--right"
            to={{ pathname: `${POKEMON.replace(':id', String(next.id))}` }}
          >
            <span className="PokemonPagination-content">
              <Avatar picture={getAvatarFromId(next.id)} /> <span className="PokemonPagination-label">{next.name}</span>
            </span>
          </Link>
        )}
      </div>
    );
  }
}

export default PokemonPagination;
