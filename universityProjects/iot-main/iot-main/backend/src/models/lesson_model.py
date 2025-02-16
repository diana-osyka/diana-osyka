class Lesson:
    def __init__(self, id, start_time, end_time, day, email_teacher, teacher, lab):
        self.id = id
        self.start_time = start_time
        self.end_time = end_time
        self.day = day
        self.email_teacher = email_teacher
        self.teacher = teacher
        self.lab = lab

    @staticmethod
    def from_firestore(doc):
        data = doc.to_dict()
        return Lesson(
            id=doc.id,
            start_time=data.get("cas_od"),
            end_time=data.get("cas_do"),
            day=data.get("den"),
            email_teacher=data.get("email_ucitela"),
            teacher=data.get("meno_ucitela"),
            lab=data.get("miestnost"),
        )
