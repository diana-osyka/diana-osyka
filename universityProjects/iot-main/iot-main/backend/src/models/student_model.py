class Student:
    def __init__(self, id, isic_id_cip, email, name):
        self.id = id
        self.isic_id_cip = isic_id_cip
        self.email = email
        self.name = name

    @staticmethod
    def from_firestore(doc):
        data = doc.to_dict()
        return Student(
            id=doc.id,
            isic_id_cip=data.get("isic_id_cip"),
            email=data.get("email"),
            name=data.get("name"),
        )
