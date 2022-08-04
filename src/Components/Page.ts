const Page = (): string => `
  <fieldset>
    <button class="btn-garage">to garage</button>
    <button class="btn-winners">to winners</button>
  </fieldset>
  <header class="garage-header">
    <fieldset>
      <input type="text" name="create-name" id="create-name">
      <input type="color" name="create-color" id="create-color">
      <button class="btn-create">create</button>
    </fieldset>
    <fieldset class="update-placeholder">
      <input type="text" name="update-name" id="update-name" disabled>
      <input type="color" name="update-color" id="update-color" disabled>
      <button class="btn-update" disabled>update</button>
    </fieldset>
    <fieldset>
      <button class="btn-race">race</button>
      <button class="btn-reset">reset</button>
      <button class="btn-generate">generate cars</button>
    </fieldset>
  </header>
  <main class="garage-main">
    <h2>Garage (<span class="number-cars">20</span>)</h2>
    <h3>Page #<span class="number-pages">9</span></h3>
    <ul>
    </ul>
    <button class="prev">prev</button>
    <button class="next">next</button>
  </main>
  <section class="section-winners">
    <h2>Winners (<span class="number-winners">4</span>)</h2>
    <h3>Page #<span class="number-pages-winners">9</span></h2>
    <table>
      <thead>
        <tr>
          <th>number</th>
          <th>car</th>
          <th>name</th>
          <th class="btn-wins">wins</th>
          <th class="btn-time">best time (seconds)</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    <button class="prev-winners">prev</button>
    <button class="next-winners">next</button>
  </section>
`;

export default Page;
