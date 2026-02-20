export const Card = ({ id, name, image, status, species, gender, origin }) => {
  return (
    <section>
      <h2>
        #{id} / {name}
      </h2>
        <img src={image} alt={name} />

        <div>
          <p>Status - {status}</p>
          <p>Species - {species}</p>
          <p>Gender - {gender}</p>
          <p>Origin - {origin}</p>
        </div>

    </section>
  );
};