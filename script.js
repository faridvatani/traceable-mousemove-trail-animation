/* initial Lenis Scroll
 * https://github.com/darkroomengineering/lenis
 */

const lenis = new Lenis();

lenis.on('scroll', (e) => {
  // console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
