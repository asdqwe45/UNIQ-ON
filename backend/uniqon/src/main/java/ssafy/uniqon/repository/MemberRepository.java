package ssafy.uniqon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.uniqon.model.Members;

public interface MemberRepository extends JpaRepository<Members, String> {
}
