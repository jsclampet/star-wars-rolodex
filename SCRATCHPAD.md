TO DO NEXT
- Review App.tsx lines 89 through 97
- Add state for input:
  -  onChange (to detect when input empty, restore table data <displayed characters>)
  -  onSubmit (to query search)


### Error Handling
COMPLETE

### Caching 

- Save responses to state
- variable 'displayedCharacters' to show up to 10, increment/decrement 10 based on prev/next click
    - displayedCharacters (with test fn code written) successfully replaces 'characters'
    - now implement characters as cache? ... each "next" adds... 
      - [...characters, more characters]
- IM HERE... in the middle of this ... created a BIG MESS ... need to clean up (bunch of stuff commented, some values 'undefined' , etc ... )

## NAV
### Functionality
- Figure out props for disabled view, button onClicks, and input search


## Search
- Add search functionality


# In README.md , include how crucial error handling was 
- Thorough troubleshooting to find out that the API was not as reliable since you the code frequently errored out CORS error
- Upon further research, CORS error could only be resolved on the server side
- However, we could inform user of request failure via caught error/exceptions 

<!-- DOWN BELOW, PROBLEM... STATUS AS OF 11/4 -->

Search works ... kinda ... but it runs through the rest of the function which saves the results in the characters object ... causing a 