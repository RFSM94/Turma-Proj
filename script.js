
  const sidebarAbout = document.querySelector('.sidebarAbout');
  const languageLinks = document.querySelectorAll('#language a');
  const scrollSpeeds = [1, 2, 3, 1, 4, 3, 5, 2, 3, 1]; // Adjust scroll speeds

function startScrolling(element, speed, reverse) {
  element.scrollTop = reverse ? element.scrollHeight - element.clientHeight : 0; // Set the initial scroll position based on reverse flag
  const scrollDirection = reverse ? -1 : 1; // Set the scroll direction based on reverse flag

  return setInterval(() => {
    element.scrollTop += scrollDirection * speed; // Increment the scroll position
    if (
      (!reverse && element.scrollTop >= element.scrollHeight - element.clientHeight) || // Check if reached the end (non-reverse)
      (reverse && element.scrollTop <= 0) // Check if reached the top (reverse)
    ) {
      element.scrollTop = reverse ? element.scrollHeight - element.clientHeight : 0; // Reset the scroll position to the opposite end
    }
  }, 50); // Scroll update interval in milliseconds
}

function stopScrolling(scrollInterval) {
  clearInterval(scrollInterval); // Stop the scroll interval by clearing it
}

document.addEventListener('DOMContentLoaded', function() {
  const sidebarAbout = document.querySelector('.sidebarAbout');
  const menu = document.querySelector('.menu');
  const button = document.getElementById('button');
  const splitLeftDivs = document.querySelectorAll('#split-left');
  const scrollContents = document.querySelectorAll('.scroll-content');
  const allLis = document.querySelectorAll('ul#vertical-accordion > li');
  let scrollIntervals = []; // Array to store scroll intervals

  function toggleExpand() {
    sidebarAbout.classList.toggle('expand'); // Toggle the 'expand' class on sidebarAbout element
  }

  sidebarAbout.addEventListener('click', function(event) {
    if (event.target === menu || event.target === button) {
      toggleExpand();
    }
  });

  // Add an event listener to the language links to stop propagation of the click event
  languageLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  });

  allLis.forEach((li, index) => {
    const splitLeftDiv = splitLeftDivs[index];
    const scrollContent = scrollContents[index];
    const scrollSpeed = scrollSpeeds[index % scrollSpeeds.length]; // Get scroll speed based on the index (with module to loop)
    const reverseScroll = index % 2 !== 0; // Reverse scroll for every other column

    let scrollInterval;

    scrollInterval = startScrolling(splitLeftDiv, scrollSpeed, reverseScroll); // Start the scrolling for the current element
    scrollIntervals.push(scrollInterval); // Store the scroll interval in the array

    li.addEventListener('mouseenter', function() {
      stopScrolling(scrollInterval); // Stop the scrolling for the current element
      splitLeftDiv.scrollTop = 0; // Set the scroll position to the top
    });

    li.addEventListener('mouseleave', function() {
      scrollInterval = startScrolling(splitLeftDiv, scrollSpeed, reverseScroll); // Restart scrolling for the current element
      scrollIntervals.push(scrollInterval); // Store the new scroll interval
    });
  });
});

/* ANIMATION LOGO */

const words = ['THINKING', 'DOING', 'ACTING'];

function changeText() {
  const dynamicText = document.getElementById('dynamic-text');
  let currentIndex = 0;

  function updateText() {
    dynamicText.textContent = words[currentIndex];
    currentIndex = (currentIndex + 1) % words.length;
  }

  setInterval(updateText, 2000);
}

changeText();

