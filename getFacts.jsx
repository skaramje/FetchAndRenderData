function App() {
    const { Container } = ReactBootstrap;
    const { useState, useEffect } = React;
    const [data, setData] = useState({ total:0, result:[] });
    const [query, setQuery] = useState("karate");
    const [isError, setIsError] = useState(false);
    const [url, setUrl] = useState(
      "https://api.chucknorris.io/jokes/search?query=karate"
    );
    const [isLoading, setIsLoading] = React.useState(false);
    console.log("Rendering App");
    
    useEffect(() => {   // Handles the LifeCycle Events
      console.log("Fetching data...");
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const result = await axios(url);
          setData(result.data);
        } catch (error) {
          setIsError(true);
        }
        setIsLoading(false);
      };
  
      fetchData();
    }, [url]);
    return (
      <Container>
        <form
          onSubmit={event => {
            setUrl(`https://api.chucknorris.io/jokes/search?query=${query}`);
  
            event.preventDefault();
          }}
        >
          <input
            type="text"
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
          <button type="submit">Search by category</button>
        </form>
        {isError && <div>Something went wrong ...</div>}
  
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <ul>
              {data.result.map(item => (
              <li key={item.id}>
                <a href={item.url}>{item.value}</a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    );
  }
  // ========================================
  ReactDOM.render(<App />, document.getElementById("root"));
  
  