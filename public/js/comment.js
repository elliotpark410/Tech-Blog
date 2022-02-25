// create form handler that includes a fetch request for a backend route
async function commentFormHandler(event) {
  event.preventDefault();

  const comment_content = document.querySelector('#comment').value.trim();

  const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];

  if (comment_content) {
      const response = await fetch('/api/comment', {
          method: 'POST',
          body: JSON.stringify({ 
              comment_content,
              post_id,
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          document.location.reload();

      } else {
          alert(response.statusText);
          document.querySelector('#comment-form').style.display = "block";
      }
  }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);