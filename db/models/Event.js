module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      organizer: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
      },
      numOfSeats: {
        type: DataTypes.INTEGER,
      },
      bookedSeats: {
        type: DataTypes.INTEGER,
      },
      startDate: {
        type: DataTypes.DATE,
        validate: {
          StartDateValidate(value) {
            if (this.endDate === null && value === null) {
              throw new Error(
                "this can not be null, becuase endDate is already null"
              );
            }
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        validate: {
          EndDateValidate(value) {
            if (value === null && this.startDate === null) {
              throw new Error(
                "this can not be null, becuase startDate is already null"
              );
            }
          },
        },
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
  return Event;
};
