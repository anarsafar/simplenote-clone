// ================ SEARCH NOTE BEHAVIOR ==================

// Run useEffect only Component Update based on "searchNote" state
// const isInitialMount = useRef(true);

// useEffect(() => {
//   const filterSearch = () => {
//     console.log("Input update from new Effect");
//     const searchElement = searchNote.toLowerCase();

//     noteList.filter((note) => {
//       const noteListElement = note.title.toLowerCase();
//       if (noteListElement.includes(searchElement)) {
//         console.log("found");
//       }
//     });
//   };

//   if (isInitialMount.current) {
//     isInitialMount.current = false;
//   } else {
//     filterSearch();
//   }
// }, [searchNote]);
