function check( done, f ) {
  try { f(); done(); } catch(e) { done(e); }
}
export default {check};
