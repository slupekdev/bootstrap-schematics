export interface Schema {
    /**
     * Name or index of related client app.
     */
    app?: string;
    /**
     * The file extension to be used for style files.
     */
    styleext?: string;
    /**
     * Which version of Boostrap to use (3 or 4).
     */
    version?: string;
}