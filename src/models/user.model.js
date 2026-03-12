import { DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    guid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    name: {
      type:DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [2, 100]
        }
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [6, 255],
        }
      }
    }
  },{  
      timestamps: true,
      tableName: 'Users',
  });

    // Ассоциации
  User.associate = (models) => {
    User.hasMany(models.Lobby, {
      foreignKey: 'hostId',
      as: 'hostedLobbies'
    });
    
    // User может участвовать во многих лобби (через участников)
    User.belongsToMany(models.Lobby, {
      through: models.LobbyParticipant,
      foreignKey: 'userId',
      otherKey: 'lobbyId',
      as: 'joinedLobbies'
    });
    
    // User имеет много записей в участниках лобби
    User.hasMany(models.LobbyParticipant, {
      foreignKey: 'userId',
      as: 'participations'
    });
  };

  return User;
};