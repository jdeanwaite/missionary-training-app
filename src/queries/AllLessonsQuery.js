import gql from 'graphql-tag';

export default gql`
  query AllLessons {
    allLessons {
      id
      name
      principles {
        id
        name
        doctrine {
          markdown
        }
        teach {
          instruction {
            markdown
          }
          pointsToTeach {
            markdown
          }
        }
        videos {
          title
          embedHtml
          poster
        }
        scriptureGroups {
          title
          scriptures {
            displayText
            book
            subBook
            chapter
            verse
          }
        }
        quiz {
          questions {
            type
            question
            options {
              id
              text
            }
            correctAnswerId
          }
        }
      }
    }
  }
`;
