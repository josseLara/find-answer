let text = document.getElementById( 'txt' )
let question = document.getElementById( 'question' )
let btn_send = document.querySelector( '.btn-send' )
let progress = document.querySelector( '.progress' )
let answer__p = document.querySelector( '.answer__p')

btn_send.addEventListener( 'click', () => {

  progress.style.visibility = 'visible';
  progress.style.display = 'block';

  qna.load().then( model => {
    progress.style.display = 'none';
    progress.style.visibility = 'hidden'
    // Find the answers
    model.findAnswers( question.value, text.value ).then( answers => {
      let answer_content = '';
      let i = 0;
      answers.forEach( element => {
        if ( element.text == '' ) {
          answer_content = 'answer not found enter more information'
        } else {
          answer_content += `${i}) ${element.text} <br>`;
          i++;
        }

      } );
      answer__p.innerHTML = answer_content;
     
    } );
  } );
} )

// -------------------------------------------------------------------------------
// btn animation


const createSVG = ( width, height, radius ) => {
  const svg = document.createElementNS( "http://www.w3.org/2000/svg", "svg" );

  const rectangle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );

  svg.setAttributeNS(
    "http://www.w3.org/2000/svg",
    "viewBox",
    `0 0 ${width} ${height}`
  );

  rectangle.setAttribute( "x", "0" );
  rectangle.setAttribute( "y", "0" );
  rectangle.setAttribute( "width", "100%" );
  rectangle.setAttribute( "height", "100%" );
  rectangle.setAttribute( "rx", `${radius}` );
  rectangle.setAttribute( "ry", `${radius}` );
  rectangle.setAttribute( "pathLength", "10" );

  svg.appendChild( rectangle );

  return svg;
};

document.querySelectorAll( ".sketch-button" ).forEach( ( button ) => {
  const style = getComputedStyle( button );

  const lines = document.createElement( "div" );

  lines.classList.add( "lines" );

  const groupTop = document.createElement( "div" );
  const groupBottom = document.createElement( "div" );

  const svg = createSVG(
    button.offsetWidth,
    button.offsetHeight,
    parseInt( style.borderRadius, 10 )
  );

  groupTop.appendChild( svg );
  groupTop.appendChild( svg.cloneNode( true ) );
  groupTop.appendChild( svg.cloneNode( true ) );
  groupTop.appendChild( svg.cloneNode( true ) );

  groupBottom.appendChild( svg.cloneNode( true ) );
  groupBottom.appendChild( svg.cloneNode( true ) );
  groupBottom.appendChild( svg.cloneNode( true ) );
  groupBottom.appendChild( svg.cloneNode( true ) );

  lines.appendChild( groupTop );
  lines.appendChild( groupBottom );

  button.appendChild( lines );

  button.addEventListener( "pointerenter", () => {
    button.classList.add( "start" );
  } );

  svg.addEventListener( "animationend", () => {
    button.classList.remove( "start" );
  } );
} );
