import { Database } from '@nozbe/watermelondb';

const localDb = async () => {
    const LokiJSAdapter = (await import('@nozbe/watermelondb/adapters/lokijs')).default;

    const schema = (await import('../model/schema')).default;
    const Brands = (await import('../model/brands.model')).default; // ⬅️ You'll import your Models here
    const Categories = (await import('../model/categories.model')).default; // ⬅️ You'll import your Models here
    const Manufacturers = (await import('../model/manufacturers.model')).default; // ⬅️ You'll import your Models here
    const Models = (await import('../model/models.model')).default; // ⬅️ You'll import your Models here
    const Segments = (await import('../model/segments.model')).default; // ⬅️ You'll import your Models here
    const Buyers = (await import('../model/buyers.model')).default; // ⬅️ You'll import your Models here

    // First, create the adapter to the underlying database:
    const adapter = await new LokiJSAdapter({
        schema,
        useWebWorker: false,
        useIncrementalIndexedDB: true,
        // dbName: 'myapp', // optional db name
        // Optional, but recommended event handlers:
        onIndexedDBVersionChange: () => {
            // database was deleted in another browser tab (user logged out), so we must make sure we delete
            // it in this tab as well
            // if (checkIfUserIsLoggedIn()) {
            //     window.location.reload();
            // }
        },
        // (optional, but recommended)
        onQuotaExceededError: (error) => {
            // Browser ran out of disk space -- do something about it
        },
        onSetUpError: (error) => {
            // Database failed to load -- offer the user to reload the app or log out
        },
        extraIncrementalIDBOptions: {
            onDidOverwrite: () => {
                // Called when this adapter is forced to overwrite contents of IndexedDB.
                // This happens if there's another open tab of the same app that's making changes.
                // You might use it as an opportunity to alert user to the potential loss of data
            }
        }
    });

    // Then, make a Watermelon database from it!
    const localDb = new Database({
        adapter,
        modelClasses: [
            Brands, // ⬅️ You'll add Models to Watermelon here
            Categories,
            Manufacturers,
            Models,
            Segments,
            Buyers
        ],
        actionsEnabled: true
    });
    return localDb;
};
export default localDb;
