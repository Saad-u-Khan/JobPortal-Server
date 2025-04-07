module.exports = (sequelize, DataTypes) => {
    
    const Candidates = sequelize.define("Candidates", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "N/A",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "N/A",
        },
        qualification: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "N/A",
        },
        skills: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "N/A",
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "N/A",
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "N/A",
        },
    });

    Candidates.associate = (models) => {
        Candidates.hasMany(models.Applies, {
            onDelete: "cascade"
        });
    };

    return Candidates;
}