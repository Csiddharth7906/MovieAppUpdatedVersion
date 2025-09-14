const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results]);
        setpage((prevPage) => prevPage + 1);
      } else {
        sethasmore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Reset data when filters change
  useEffect(() => {
    settrending([]);
    setpage(1);
    sethasmore(true);
  }, [category, duration]);

  // Fetch first page when reset is done
  useEffect(() => {
    if (page === 1) GetTrending();
  }, [page, category, duration]);

  return trending.length ? (
    <div className="w-screen h-screen">
      <div className="w-full px-[5%] flex items-center justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i onClick={() => navigate(-1)} className="hover:text-[#D2042D] mr-3 ri-arrow-left-line" />
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <DropDown title="Category" options={["movie", "tv", "all"]} func={(e) => setcategory(e.target.value)} />
          <div className="w-[2%]"></div>
          <DropDown title="Duration" options={["week", "day"]} func={(e) => setduration(e.target.value)} />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasmore}
        loader={<h1>loading..</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};
