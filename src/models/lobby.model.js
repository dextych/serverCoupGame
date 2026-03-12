// models/Lobby.js
import { DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  const Lobby = sequelize.define('Lobby', {
    guid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    code: {
      type: DataTypes.STRING(6),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [6, 6],
          msg: 'Код лобби должен быть ровно 6 символов'
        },
        isUppercase: {
          msg: 'Код лобби должен быть в верхнем регистре'
        }
      }
    },
    hostId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'guid'
      }
    },
    status: {
      type: DataTypes.ENUM('waiting', 'playing', 'finished'),
      defaultValue: 'waiting',
      allowNull: false
    },
    maxPlayers: {
      type: DataTypes.INTEGER,
      defaultValue: 6,
      allowNull: false,
      validate: {
        min: 2,
        max: 10
      }
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    settings: {
      type: DataTypes.JSONB,
      defaultValue: {
        allowBlef: true,
        timePerMove: 60,
        withTimer: true
      },
      allowNull: false
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    finishedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'Lobbies',
  });
  
  Lobby.associate = (models) => {
    Lobby.belongsTo(models.User, {
        foreignKey: 'hostId',
        as: 'host'
    });
    
    Lobby.belongsToMany(models.User, {
        through: models.LobbyParticipant,
        foreignKey: 'lobbyId',
        otherKey: 'userId',
        as: 'participants'
    });
    
    Lobby.hasMany(models.LobbyParticipant, {
        foreignKey: 'lobbyId',
        as: 'participantEntries'
    });
  };

  return Lobby;
};