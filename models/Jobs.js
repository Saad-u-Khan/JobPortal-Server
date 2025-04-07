module.exports = (sequelize, DataTypes) => {

    const Jobs = sequelize.define("Jobs",  {
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        skills: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Jobs.associate = (models) => {
        Jobs.hasMany(models.Applies, {
            onDelete: "cascade"
        });
    };

    return Jobs;
}