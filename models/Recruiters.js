module.exports = (sequelize, DataTypes) => {

    const Recruiters = sequelize.define("Recruiters", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Recruiters.associate = (models) => {
        Recruiters.hasMany(models.Jobs, {
            onDelete: "cascade",
        });
    };
    return Recruiters;
}