import { DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  const LobbyParticipant = sequelize.define('LobbyParticipant', {
    guid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    lobbyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Lobbies',
        key: 'guid'
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'guid'
      }
    },
    joinedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 9
      }
    },
  }, {
    timestamps: false,
    tableName: 'LobbyParticipants',
  });
  
  LobbyParticipant.associate = (models) => {
    LobbyParticipant.belongsTo(models.Lobby, {
        foreignKey: 'lobbyId',
        as: 'lobby'
    });
    LobbyParticipant.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
    });
  };

  return LobbyParticipant;
};