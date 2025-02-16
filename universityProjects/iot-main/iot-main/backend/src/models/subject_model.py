class Subject:
    def __init__(self, id, name, period, semester):
        self.id = id
        self.name = name
        self.period = period
        self.semester = semester

    @staticmethod
    def from_firestore(doc):
        data = doc.to_dict()
        return Subject(
            id=doc.id,
            name=data.get("nazov"),
            period=data.get("obdobie"),
            semester=data.get("semester"),
        )
