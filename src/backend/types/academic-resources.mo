module {
  public type AcademicCategory = {
    #timetable;
    #exam_schedule;
    #curriculum;
  };

  public type AcademicResource = {
    id : Text;
    title : Text;
    category : AcademicCategory;
    description : Text;
    uploadedAt : Int;
    storageKey : Text;
  };
};
